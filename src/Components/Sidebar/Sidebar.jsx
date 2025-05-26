import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/context";

function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { onSent, previousPrompt, setRecentPrompt, newChat } =
    useContext(Context);

  function handleClick() {
    setOpenSidebar(!openSidebar);
  }

  async function handleLoadPrompt(prompt) {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }
  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={handleClick}
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {openSidebar ? <p onClick={() => newChat()}>New Chat</p> : null}
        </div>
        {openSidebar ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.map((prevPrompt) => (
              <div
                className="recent-entry"
                onClick={() => handleLoadPrompt(prevPrompt)}
              >
                <img src={assets.message_icon} alt="" />
                <p>{prevPrompt.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {openSidebar ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {openSidebar ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {openSidebar ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
