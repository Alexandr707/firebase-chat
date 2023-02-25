import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { getAllUsers } from "../../firebase";
import { colourStyles } from "./colorStyles";

function SelectModers({
  selected = new Function(),
  placeholder = "Select...",
  chat,
  ...props
}) {
  const userId = useSelector((state) => state.user.userId);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [[primaryColor], setColors] = useState([]);

  useEffect(() => {
    if (primaryColor) {
      getAllUsers()
        .then((users) => users.filter((u) => u.uid !== userId))
        .then((users) => {
          const opt = users.map((u) => {
            return {
              color: primaryColor,
              value: u.uid,
              label: u.nickname,
            };
          });
          setOptions(opt);

          if (users.length && chat && chat.moderators) {
            const selectedUsersOpt = users
              .filter((u) => !!chat.moderators[u.uid])
              .map((u) => {
                return {
                  color: primaryColor,
                  value: u.uid,
                  label: u.nickname,
                };
              });
            setSelectedUsers(selectedUsersOpt);
          }
        });
    }
  }, [primaryColor]);

  useEffect(() => {
    const primaryColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--primaryColor");

    setColors([primaryColor.trim()]);
  }, []);

  function selectChange(sl) {
    setSelectedUsers(sl);
    selected(sl);
  }

  if (!options.length) return null;

  return (
    <Select
      placeholder={placeholder}
      className={props.className || ""}
      defaultValue={selectedUsers}
      options={options}
      onChange={selectChange}
      isMulti
      styles={colourStyles}
    />
  );
}

export default SelectModers;
