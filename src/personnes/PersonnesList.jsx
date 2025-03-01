import { useState, useEffect } from "react";
import axios from "axios";
import EditPersonne from "./EditPersonne";
import AddPersonne from "./AddPersonne";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPenToSquare, faPlus, faTrash, faLink } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";

function PersonnesList() {
  const personnes = useSelector((state) => state.personnes);
  const projets = useSelector((state) => state.projets);
  const [personne, setPersonne] = useState({});
  const [query, setQuery] = useState("");
  const [selectedPersonnes, setSelectedPersonnes] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const dispatch = useDispatch();

  const personnesFuse = new Fuse(personnes, { keys: ["nom", "prenom", "email", "tele"], threshold: 0.3 });
  const results = query ? personnesFuse.search(query).map((r) => r.item) : personnes;

  const handleCheckboxChange = (id) => {
    setSelectedPersonnes((prev) =>
      prev.includes(id)
        ? prev.filter((personneId) => personneId !== id)
        : [...prev, id]
    );
  };

  const attachPersonnesToProject = () => {
    if (!selectedProject) {
      alert("Please select a project.");
      return;
    }
    if (selectedPersonnes.length === 0) {
      alert("Please select at least one personne.");
      return;
    }

    axios.post(`http://127.0.0.1:8000/api/projets/${selectedProject}/attach-personnes`, {personne_ids: selectedPersonnes}).then(() => {
        alert("Personnes attached successfully!");
        setSelectedPersonnes([]);
        setSelectedProject("");
      })
      .catch((error) => {
        console.error("Error attaching personnes:", error);
        alert("Failed to attach personnes.");
      });
  };

  const deletePersonne = (id) => {
    if (confirm("Are you sure you want to delete this personne?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/personnes/${id}`)
        .then(() => {
          dispatch({
            type: "UPDATE_PERSONNES",
            payload: personnes.filter((c) => c.id !== id),
          });
        });
    }
  };

  const handleAdd = () => document.getElementById("addModal").showModal();
  const handleModify = (id) => {
    setPersonne(personnes.find((personne) => personne.id === id));
    document.getElementById("modifyModal").showModal();
  };

  return (
    <div className="border-sh rounded-xl overflow-hidden mx-1 md:mx-4 h-fit my-4">
      <div className="flex flex-wrap justify-between items-center gap-6 my-4 px-3">
        <div className="flex gap-4">
          <h1 className="text-4xl text-center">Personne List</h1>
          <span className="badge badge-outline badge-lg m-3 count">{results.length}</span>
        </div>
        <button className="join-item btn btn-outline btn-info btn-sm" onClick={handleAdd}>
          <FontAwesomeIcon icon={faPlus} /> New Personne
        </button>
      </div>


      <div className="flex justify-between px-3 gap-3">

        <div className="flex justify-end px-3 gap-3 items-center w-1/3">
          <select
            className="select select-bordered select-sm"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select a project</option>
            {projets.map((project) => (
              <option key={project.id} value={project.id}>
                {project.intitule}
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={attachPersonnesToProject}
            disabled={!selectedProject || selectedPersonnes.length === 0}
          >
            <FontAwesomeIcon icon={faLink} /> Attach to Project
          </button>
        </div>

        <label className="input input-sm w-1/6 focus-within:outline-none">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow" onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>Telephon</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {results.map((personne, i) => (
              <tr key={i} className="hover:bg-base-300">
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedPersonnes.includes(personne.id)}
                      onChange={() => handleCheckboxChange(personne.id)}
                    />
                  </label>
                </th>
                <td>
                  <div className="font-bold">{personne.id}</div>
                </td>
                <td>
                  <div className="font-bold capitalize">{personne.nom}</div>
                </td>
                <td>
                  <div className="font-bold">{personne.prenom}</div>
                </td>
                <td>
                  <div className="font-bold">{personne.email}</div>
                </td>
                <td>
                  <div className="font-bold">{personne.tele}</div>
                </td>
                <th>
                  <div className="join">
                    <Link className="join-item btn btn-outline btn-info btn-sm" to={`/personnes/${personne.id}`}>
                      <FontAwesomeIcon icon={faCircleInfo} /> Details
                    </Link>
                    <button className="join-item btn btn-outline btn-warning btn-sm" onClick={() => handleModify(personne.id)}>
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button>
                    <button className="join-item btn btn-outline btn-secondary btn-sm" onClick={() => deletePersonne(personne.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="modifyModal" className="modal">
        <div className="modal-box">
          <EditPersonne personne={personne} setPersonne={setPersonne} personnes={personnes} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="addModal" className="modal">
        <div className="modal-box">
          <AddPersonne personnes={personnes} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default PersonnesList;