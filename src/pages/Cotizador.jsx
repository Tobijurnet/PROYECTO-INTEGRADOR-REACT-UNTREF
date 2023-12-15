import React, { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Cotizador = () => {
 const [propiedad, setPropiedad] = useState('');
 const [ubicacion, setUbicacion] = useState('');
 const [metros2, setMetros2] = useState(20);
 const [valorPoliza, setValorPoliza] = useState(0);
 const [historial, setHistorial] = useState([]);

 const datosPropiedad = [
    {tipo: "..."},
    { tipo: 'Casa', factor: 1.09 },
    { tipo: 'P.H.', factor: 1.05 },
    { tipo: 'Depto. Edificio', factor: 1.02 },
    { tipo: 'Barrio Privado', factor: 1.19 },
    { tipo: 'Oficina', factor: 2.39 },
    { tipo: 'Local Comercial', factor: 1.41 },
    { tipo: 'Depósito Logística', factor: 1.92 },
 ];

 const datosUbicacion = [
    {tipo: "..."},
    { tipo: 'CABA', factor: 1.13 },
    { tipo: 'Tandil', factor: 1.04 },
    { tipo: 'Costa Atlántica', factor: 1.29 },
    { tipo: 'Patagonia', factor: 1.00 },
 ];

 const handleChange = (e) => {
    if (e.target.name === 'propiedad' && e.target.value !== "...") {
      setPropiedad(e.target.value);
    } else if (e.target.name === 'ubicacion' && e.target.value !== "...") {
      setUbicacion(e.target.value);
    }
 };

 const calcularPoliza = () => {
    const propiedadSeleccionada = datosPropiedad.find(
      (prop) => prop.tipo === propiedad
    );
    const ubicacionSeleccionada = datosUbicacion.find(
      (ubi) => ubi.tipo === ubicacion
    );

    if (propiedadSeleccionada && ubicacionSeleccionada) {
      const valor =
        (metros2 * propiedadSeleccionada.factor) *
        ubicacionSeleccionada.factor;
      setValorPoliza(valor);

      setHistorial([...historial, { propiedad, ubicacion, metros2, valor }]);
    }
 };
  const MySwal = () => {
    withReactContent(Swal).fire({
      icon: "success",
      title: "Cotización calculada",
      showConfirmButton: false,
      timer: 2500
    })
  }

  const hancleClick = () => {
    MySwal ();
    calcularPoliza();
  }

 return (
    <>
      <h1 className="center separador">Seguros del hogar 🏡</h1>
      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>

        <label for="propiedad">Selecciona el tipo de propiedad</label>
        <select name="propiedad" value={propiedad} onChange={handleChange}>
          {datosPropiedad.map((prop) => (
            <option key={prop.tipo} value={prop.tipo}>
              {prop.tipo}
            </option>
          ))}
        </select>

        <label for="ubicacion">Selecciona su ubicación</label>
        <select name="ubicacion" value={ubicacion} onChange={handleChange}>
          {datosUbicacion.map((ubi) => (
            <option key={ubi.tipo} value={ubi.tipo}>
              {ubi.tipo}
            </option>
          ))}
        </select>

        <label for="metros2">Ingresa los Metros cuadrados:</label>
        <input
          type="number"
          id="metros2"
          value={metros2}
          onChange={(e) => setMetros2(e.target.value)}
          min="20"
          max="500"
          required
        />

        <div className="center separador">
          <button onClick={hancleClick} className="button button-outline">
            Cotizar
          </button>
        </div>

        <div className="center separador">
          <p className="importe">Precio estimado: $ {valorPoliza.toFixed(2)}</p>
        </div>
      </div>

      <h2 className="center separador">Historial de Cotizaciones📋</h2>
      <table>
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Ubicación</th>
            <th>Metros cuadrados</th>
            <th>Valor Poliza</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((transaccion, index) => (
            <tr key={index}>
              <td>{transaccion.propiedad}</td>
              <td>{transaccion.ubicacion}</td>
              <td>{transaccion.metros2}</td>
              <td>${transaccion.valor.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
 );
};

export default Cotizador;