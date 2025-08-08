import clsx from "clsx";
import { shallow } from "zustand/shallow";
import { useUserQuery } from "../api/queries";
import { useSendSettingsStore } from "../state/sendSettings";
import LoginSuggest from "./LoginSuggest";
import SendMenuChannel from "./SendMenuChannel";
import SendMenuWebhook from "./SendMenuWebhook";

export default function SendMenu() {
  const [mode, setMode] = useSendSettingsStore(
    (state) => [state.mode, state.setMode],
    shallow
  );

  const { data: user } = useUserQuery();

  function toggleMode() {
    setMode("webhook");
  }

  return (
    <div>
        <SendMenuWebhook />
    </div>
  );
}
