import clsx from "clsx";
import { useCurrentAttachmentsStore } from "../state/attachments";
import { AutoAnimate } from "../util/autoAnimate";
import Collapsable from "./Collapsable";
import { ChangeEvent, useRef } from "react";
import { getUniqueId } from "../util";
import EditorAttachment from "./EditorAttachment";
import { shallow } from "zustand/shallow";
import { useCurrentMessageStore } from "../state/message";

export default function EditorAttachments() {
  const attachments = useCurrentAttachmentsStore((state) =>
    state.attachments.map((a) => a.id)
  );

  const componentsV2Enabled = useCurrentMessageStore((state) =>
    state.getComponentsV2Enabled()
  );

  const totalBytes = useCurrentAttachmentsStore((state) =>
    state.attachments.reduce((acc, curr) => acc + curr.size, 0)
  );

  const [addAttachment, clearAttachments] = useCurrentAttachmentsStore(
    (state) => [state.addAttachment, state.clearAttachments],
    shallow
  );

  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddAttachment() {
    if (attachments.length >= 10) return;
    inputRef.current?.click();
  }

  function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file.size > 25 * 1024 * 1024) {
        alert("File too large! Max 25MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        addAttachment({
          id: getUniqueId(),
          size: file.size,
          name: file.name,
          description: null,
          data_url: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  return;
}
