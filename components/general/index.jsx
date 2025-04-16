"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gxovcanyyuoztglkezwi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4b3ZjYW55eXVvenRnbGtlendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDk2NDgsImV4cCI6MjA1ODcyNTY0OH0.NgrHeHxLjo7wR7Tmk_Eyn-X-4Zkv9I_iVBLrTo64yGk"
);

export default function General() {
  const [departments, setDepartments] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newDepartment, setNewDepartment] = useState("");
  const [newPrinter, setNewPrinter] = useState({
    brand: "",
    model: "",
    department_id: "",
  });
  const [newDelivery, setNewDelivery] = useState({
    delivery_date: "",
    is_set: false,
    black_qty: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: departmentsData, error: depError } = await supabase
      .from("departments")
      .select("*");
    const { data: printersData, error: printerError } = await supabase
      .from("printers")
      .select("*");
    const { data: deliveriesData, error: deliveryError } = await supabase
      .from("tonerDeliveries")
      .select("*");

    if (depError || printerError || deliveryError) {
      console.error(
        "Error fetching data:",
        depError || printerError || deliveryError
      );
    } else {
      setDepartments(departmentsData);
      setPrinters(printersData);
      setDeliveries(deliveriesData);
    }
    setIsLoading(false);
  };

  const addDepartment = async () => {
    if (newDepartment.trim() === "") return;
    const { data, error } = await supabase
      .from("departments")
      .insert({ name: newDepartment });

    if (error) {
      console.error("Error adding department:", error);
    } else {
      console.log("Department added:", data);
      setNewDepartment("");
      fetchData();
    }
  };

  const addPrinter = async () => {
    const { brand, model } = newPrinter;
    if (!brand || !model) return;

    const { department_id } = newPrinter;

    const { data, error } = await supabase
      .from("printers")
      .insert({ brand, model, department_id });
    if (error) {
      console.error("Error adding printer:", error);
    } else {
      console.log("Printer added:", data);
      setNewPrinter({ brand: "", model: "", department_id: "" });
      fetchData();
    }
  };

  const addDelivery = async () => {
    const { delivery_date, is_set, black_qty } = newDelivery;
    if (!delivery_date || black_qty === "") return;
    const { data, error } = await supabase
      .from("tonerDeliveries")
      .insert({ delivery_date, is_set, black_qty: Number(black_qty) });

    if (error) {
      console.error("Error adding delivery:", error);
    } else {
      console.log("Delivery added:", data);
      setNewDelivery({ delivery_date: "", is_set: false, black_qty: 0 });
      fetchData();
    }
  };

  if (isLoading) return <p>Yükleniyor...</p>;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {/* DEPARTMAN EKLEME */}
      <section>
        <h2>Departman Ekle</h2>
        <input
          type="text"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          placeholder="Departman adı"
        />
        <button onClick={addDepartment}>Ekle</button>

        <h3>Departmanlar</h3>
        {departments && departments.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dep) => (
                <tr key={dep.id}>
                  <td>{dep.id}</td>
                  <td>{dep.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Henüz departman verisi yok.</p>
        )}
      </section>

      {/* YAZICI EKLEME */}
      <section>
        <h2>Yazıcı Ekle</h2>
        <input
          type="text"
          placeholder="Marka"
          value={newPrinter.brand}
          onChange={(e) =>
            setNewPrinter({ ...newPrinter, brand: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Model"
          value={newPrinter.model}
          onChange={(e) =>
            setNewPrinter({ ...newPrinter, model: e.target.value })
          }
        />
        <select
          value={newPrinter.department_id}
          onChange={(e) =>
            setNewPrinter({ ...newPrinter, department_id: e.target.value })
          }
        >
          <option value="">Departman Seç</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>
        <button onClick={addPrinter}>Ekle</button>

        <h3>Yazıcılar</h3>
        {printers && printers.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Marka</th>
                <th>Model</th>
              </tr>
            </thead>
            <tbody>
              {printers.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.brand}</td>
                  <td>{p.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Henüz yazıcı verisi yok.</p>
        )}
      </section>

      {/* TONER EKLEME */}
      <section>
        <h2>Toner Teslimatı Ekle</h2>
        <input
          type="date"
          value={newDelivery.delivery_date}
          onChange={(e) =>
            setNewDelivery({ ...newDelivery, delivery_date: e.target.value })
          }
        />
        <label>
          <input
            type="checkbox"
            checked={newDelivery.is_set}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, is_set: e.target.checked })
            }
          />
          Set mi?
        </label>
        <input
          type="number"
          placeholder="Siyah toner adedi"
          value={newDelivery.black_qty}
          onChange={(e) =>
            setNewDelivery({ ...newDelivery, black_qty: e.target.value })
          }
        />
        <button onClick={addDelivery}>Ekle</button>

        <h3>Toner Verilişleri</h3>
        {deliveries && deliveries.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarih</th>
                <th>Set mi</th>
                <th>Siyah Adet</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.delivery_date}</td>
                  <td>{d.is_set ? "Evet" : "Hayır"}</td>
                  <td>{d.black_qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Henüz toner verisi yok.</p>
        )}
      </section>
    </div>
  );
}
