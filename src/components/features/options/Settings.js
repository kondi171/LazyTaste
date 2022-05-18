import { useState } from "react";
import AvatarSettings from "./AvatarSettings";
import DataSettings from "./DataSettings";
import WriteOpinion from "./WriteOpinion";
const Settings = () => {

  const [activeSetting, setActiveSetting] = useState(<AvatarSettings />);
  const handleChangeSetting = (setting) => setActiveSetting(setting);

  return (
    <section className="settings">
      <div className="settings__options options">
        <div onClick={() => handleChangeSetting(<AvatarSettings />)} className="options__avatar">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <div>Set Avatar</div>
        </div>
        <div onClick={() => handleChangeSetting(<DataSettings />)} className="options__data">
          <i className="fa fa-database" aria-hidden="true"></i>
          <div>Edit Personal Data</div>
        </div>

        <div onClick={() => handleChangeSetting(<WriteOpinion />)} className="options__opinion">
          <i className="fa fa-commenting" aria-hidden="true"></i>
          <div>Write Opinion</div>
        </div>
      </div>
      <div className="settings__view">
        <h3>Settings</h3>
        <div className="show-settings">
          {activeSetting}
        </div>
      </div>
    </section>
  );
}

export default Settings;