import { useState } from "react";
import axios from "axios";
import EditProjet from "./EditProjet";
import AddProjet from "./AddProjet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";

export default function ProjetsList() {
  const [projet, setProjet] = useState({});
  const [query, setQuery] = useState("");

  const projets = useSelector((state) => state.projets);
  const dispatch = useDispatch();


  const projetsFuse = new Fuse(projets, { keys: ["intitule"], threshold: 0.3 });
  const results = query ? projetsFuse.search(query).map(r => r.item) : projets;

  const deleteProjet = (id) => {
    if (confirm("Are you sure you want to delete this projet?")) {
      axios.delete(`http://127.0.0.1:8000/api/projets/${id}`).then(() => {
        dispatch({ type: "UPDATE_PROJETS", payload: projets.filter(p => p.id !== id) });
      });
    }
  };

  function handleAdd() {
    document.getElementById("addModal").showModal();
  }

  function handleModify(id) {
    setProjet(projets.find((projet) => projet.id === id));
    document.getElementById("modifyModal").showModal();
  }

  return (
    <div className="border-sh rounded-xl overflow-hidden mx-1 md:mx-4 h-fit my-4">
      <div className="flex flex-wrap justify-between items-center gap-6 my-4 px-3">
        <div className="flex gap-4">
          <h1 className="text-4xl text-center">Projet List</h1>
          <span className="badge badge-outline badge-lg m-3 count">{results.length}</span>
        </div>
        <button className="join-item btn btn-outline btn-info btn-sm" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} /> New Projet
        </button>
      </div>
      <div className="flex justify-end px-3 gap-3">
        <label className="input input-sm w-1/6 focus-within:outline-none">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr>
              <th>Id</th>
              <th>Intitule</th>
              <th>Date Debut</th>
              <th>Date Fin</th>
              <th>Duree (Days)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((projet, i) => (
              <tr key={i} className="hover:bg-base-300">
                <td>
                  <div className="font-bold">{projet.id}</div>
                </td>
                <td>
                  <div className="font-bold capitalize">{projet.intitule}</div>
                </td>
                <td>
                  <div className="font-bold">{projet.dateDebut}</div>
                </td>
                <td>
                  <div className="font-bold">{projet.dateFin}</div>
                </td>
                <td>
                  <div className="font-bold">{projet.duree}</div>
                </td>
                <th>
                  <div className="join">
                    <Link className="join-item btn btn-outline btn-info btn-sm" to={`/projets/${projet.id}`}>
                      <FontAwesomeIcon icon={faCircleInfo} /> Details
                    </Link>
                    {/* <button className="join-item btn btn-outline btn-warning btn-sm" onClick={() => handleModify(projet.id)} >
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button> */}
                    <button className="join-item btn btn-outline btn-secondary btn-sm" onClick={() => deleteProjet(projet.id)} >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog id="modifyModal" className="modal">
          <div className="modal-box">
            <EditProjet projet={projet} setProjet={setProjet} projets={projets} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog id="addModal" className="modal">
          <div className="modal-box">
            <AddProjet projets={projets} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}