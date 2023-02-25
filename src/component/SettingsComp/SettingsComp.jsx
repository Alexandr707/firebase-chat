import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import vars from "../../Constants/vars";
import { User } from "../../firebase";
import { getColorSchema } from "../../utils/getColorSchema";
import { setColorSchema } from "../../utils/setColorSchema";
import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";
import "./SettingsComp.scss";

function SettingsComp({ isOpen, close }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [preff, setPreff] = useState(null);
  const { nickname, ...colors } = preff || {};

  useEffect(() => {
    const settings = getColorSchema();
    if (userInfo) {
      settings.nickname = userInfo.nickname;
    }
    setPreff(settings);
  }, []);

  function changeColor(e, key) {
    setPreff({ ...preff, [key]: e.target.value });
  }

  function submit() {
    User.updateUser({
      ...userInfo,
      preferences: preff,
      nickname: userInfo.nickname,
    });
    setColorSchema(preff);
    close();
  }

  return (
    <DropDown isOpen={isOpen} close={close}>
      <div className="settings">
        <div className="settings__container">
          {Boolean(preff) && (
            <>
              <dl>
                <dt>nickname</dt>
                <dd>{nickname}</dd>
              </dl>
              {Object.keys(colors).map((k) => (
                <dl key={k}>
                  <dt>{k}</dt>
                  <dd>
                    <input
                      type="color"
                      value={colors[k]}
                      onChange={(e) => {
                        changeColor(e, k);
                      }}
                    />
                  </dd>
                </dl>
              ))}
            </>
          )}
          <div className="settings__btns">
            {" "}
            <Button
              onClick={() => setPreff({ ...preff, ...vars.defaultColorSchema })}
            >
              Reset colors
            </Button>
            <Button onClick={submit}>Submit</Button>
            <Button onClick={() => User.logOut()}>Logout</Button>
          </div>
        </div>
      </div>
    </DropDown>
  );
}

export default SettingsComp;
