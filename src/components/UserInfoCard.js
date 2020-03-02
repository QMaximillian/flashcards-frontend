import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams, useRouteMatch, Redirect} from 'react-router-dom'
import {fetchUpdateUsername, fetchShowUser} from '../fetchRequests/user'
import Modal from '../components/Modal'
import TextBox from '../components/TextBox'
import {UserContext} from '../context/user-context'
import {uuidCheck} from '../lib/helpers'

export default function UserInfoCard(props) {
  const {profile, setProfile, setNoMatch} = props
  const [modalOpen, setModalOpen] = useState(false)
  const [text, setText] = useState({name: '', value: '', isValid: true})
  const [modalError, setModalError] = useState('')
  let [redirect, setRedirect] = useState(false)
  let {user, setUser} = useContext(UserContext)
  const {user: userParam} = useParams()

  // let [newUsername, setNewUsername] = useState("");
  useEffect(() => {
    fetchShowUser(userParam)
      .then(r => setProfile(r))
      .catch(() => setNoMatch(true))
  }, [userParam, setNoMatch, setProfile])

  const createdMatch = useRouteMatch('/:user')
  const recentMatch = useRouteMatch('/:user/recent')
  const studiedMatch = useRouteMatch('/:user/studied')

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
    )
  } else {
    return <div>Loading...</div>
  }

  function renderMatch() {
    return (
      <div className="flex ml-4">
        {props.isUser && (
          <Link to={`/${profile.username}/recent`}>
            <div
              className={`${
                recentMatch
                  ? 'bg-yellow-500 text-black'
                  : 'hover:text-yellow-500 text-teal-300'
              } border border-gray-500 py-2 px-4`}
            >
              Recent
            </div>
          </Link>
        )}
        <Link to={`/${profile.username}`}>
          <div
            className={`${
              createdMatch && !studiedMatch && !recentMatch
                ? 'bg-yellow-500 text-black'
                : 'hover:text-yellow-500 text-teal-300'
            } border border-gray-500 py-2 px-4`}
          >
            Created
          </div>
        </Link>
        <Link to={`/${profile.username}/studied`}>
          <div
            className={`${
              studiedMatch
                ? 'bg-yellow-500 text-black'
                : 'hover:text-yellow-500 text-teal-300'
            } border border-gray-500 py-2 px-4 `}
          >
            Studied
          </div>
        </Link>
        {renderUsernameUpdate()}
      </div>
    )
  }

  function renderUsernameUpdate() {
    if (uuidCheck.test(profile.username)) {
      return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div style={{height: '16rem', width: '24rem'}} className="">
            <div className="flex justify-center w-full h-full bg-gray-500 items-center border border-teal-500 bg-gray-300">
              <form
                className="shadow-md rounded w-full h-full px-6 py-8 flex flex-col"
                style={{justifyContent: 'space-evenly'}}
              >
                <div className="mb-6">
                  <label
                    htmlFor="changeUsername"
                    className="text-center text-xl block font-semibold  pb-2"
                  >
                    Change Username
                  </label>
                </div>
                <div className="flex flex-wrap sm:flex-no-wrap justify-center sm:items-center sm:justify-between items-stretch">
                  <div>
                    <p class="text-red-500 text-xs italic">{modalError}</p>
                  </div>
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
                    fetchUpdateUsername({newUsername: text.value})
                      .then(r => {
                        if (r.code) {
                          setModalError(r.code)
                          return
                        }

                        setModalOpen(false)
                        props.setProfile({...profile, username: r.username})
                        setUser({...user, username: r.username})
                      })
                      .then(r => setRedirect(true))
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )
    }

    return
  }

  function renderUser() {
    return (
      <div className="text-4xl font-bold tracking-wide">
        {profile.username || profile.first_name}
        {uuidCheck.test(profile.username) ? (
          <button onClick={() => setModalOpen(true)}>Change Username</button>
        ) : null}
      </div>
    )
  }
}
