import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useRouteMatch, Redirect } from "react-router-dom";
import { fetchShowUser, fetchUpdateUsername } from "../fetchRequests/user";
import Modal from "../components/Modal";
import TextBox from "../components/TextBox";
import {UserContext} from "../context/user-context";

export default function UserInfoCard(props) {
  const { user: userParam } = useParams();
  const [profile, setProfile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState({ name: "", value: "", isValid: true });
  let [redirect, setRedirect] = useState(false);
  let { user, setUser } = useContext(UserContext)
  // let [newUsername, setNewUsername] = useState("");
  useEffect(() => {
    fetchShowUser(userParam).then(r => setProfile(r));
  }, [userParam]);

  let uuidCheck = new RegExp(
    /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/
  );

  const createdMatch = useRouteMatch("/:user");
  const recentMatch = useRouteMatch("/:user/recent");
  const studiedMatch = useRouteMatch("/:user/studied");

  if (profile) {
    return (
      <div className="flex">
        <div className="flex p-6">
          <div>
            <img className="w-32 h-32 rounded-full mr-4 bg-gray-500" alt="" />
          </div>
          <div className="flex flex-col justify-around">
            <div className="flex ml-4">
              {renderUser()}
              <div className="self-center ml-8 text-gray-500 font-light tracking-wide">{`${profile.first_name} ${profile.last_name}`}</div>
            </div>
            {renderMatch()}
          </div>
        </div>
        {redirect ? <Redirect to={`${profile.username}`} /> : null}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }

  function renderMatch() {
    return (
      <div className="flex ml-4">
        <Link to={`/${userParam}/recent`}>
          <div
            className={`${
              recentMatch
                ? "bg-yellow-500 text-black"
                : "hover:text-yellow-500 text-teal-300"
            } border border-gray-500 py-2 px-4`}
          >
            Recent
          </div>
        </Link>
        <Link to={`/${userParam}`}>
          <div
            className={`${
              createdMatch && !studiedMatch && !recentMatch
                ? "bg-yellow-500 text-black"
                : "hover:text-yellow-500 text-teal-300"
            } border border-gray-500 py-2 px-4`}
          >
            Created
          </div>
        </Link>
        <Link to={`/${userParam}/studied`}>
          <div
            className={`${
              studiedMatch
                ? "bg-yellow-500 text-black"
                : "hover:text-yellow-500 text-teal-300"
            } border border-gray-500 py-2 px-4 `}
          >
            Studied
          </div>
        </Link>
        {renderUsernameUpdate()}
      </div>
    );
  }

  function renderUsernameUpdate() {
    if (uuidCheck.test(profile.username)) {
      return (
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
              <div className="h-64 w-64 border border-black">
                Change Username
              </div>
              <TextBox
                name="update-username"
                type="text"
                placeholder="Enter text here"
                onChange={setText}
                value={text.value}
              />
              <button
                onClick={() => {
                  fetchUpdateUsername({ newUsername: text.value })
                    .then(r => {
                      setModalOpen(false);
                      setProfile({ ...profile, username: r.username });
                      setUser({ ...user, username: r.username });
                      // setNewUsername(r.username);
                    })
                    .then(r => setRedirect(true));
                }}
              >
                Submit
              </button>
            </Modal>
      );
    }

    return;
  }

  function renderUser() {
    return (
      <div className="text-4xl font-bold tracking-wide">
        {profile.username || profile.first_name}
        {uuidCheck.test(profile.username) ? (
          <button onClick={() => setModalOpen(true)}>Change Username</button>
        ) : null}
      </div>
    );
  }
}
