import { shallow } from "zustand/shallow";
import { useCurrentMessageStore } from "../state/message";
import { useSendSettingsStore } from "../state/sendSettings";
import { AutoAnimate } from "../util/autoAnimate";
import Collapsable from "./Collapsable";
import EditorComponentAddDropdown from "./EditorComponentAddDropdown";
import EditorComponentEntry from "./EditorComponentEntry";

export default function EditorComponents({
  defaultCollapsed = true,
}: {
  defaultCollapsed?: boolean;
}) {
  const components = useCurrentMessageStore(
    (state) => state.components.map((e) => e.id),
    shallow
  );
  const [clearComponents, addComponent] = useCurrentMessageStore(
    (state) => [state.clearComponents, state.addComponent],
    shallow
  );

  const sendMode = useSendSettingsStore((state) => state.mode);

  return;
}
