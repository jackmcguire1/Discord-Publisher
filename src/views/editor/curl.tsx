import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useCurrentMessageStore } from "../../state/message";
import { useSendSettingsStore } from "../../state/sendSettings";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { githubDark } from "@uiw/codemirror-theme-github";
import { linter, lintGutter } from "@codemirror/lint";
import { parseMessageWithAction } from "../../discord/restoreSchema";
import { useNavigate } from "react-router-dom";
import { useToasts } from "../../util/toasts";

// transform-and-generate-curl.ts
type MessageEmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

type MessageEmbedImage = {
  url: string;
};

type MessageEmbedFooter = {
    text: string;
    icon_url: string;
}

type MessageEmbed = {
  url?: string;
  title?: string;
  description?: string;
  color?: number;
  image?: MessageEmbedImage;
  fields?: MessageEmbedField[];
  footer?: MessageEmbedFooter;
  timestamp?: string;
};

type WebhookParams = {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  embeds?: MessageEmbed[];
  components?: any[];
  flags?: number;
};

export default function CurlView() {

  const navigate = useNavigate();
  const createToast = useToasts((s) => s.create);

  const msg = useCurrentMessageStore();
  const webhookUrl = useSendSettingsStore((s) => s.webhookUrl);
    
  const [raw, setRaw] = useState("{}");

    useEffect(() => {
      const webhook = webhookUrl || "https://steve.com";
      const payload = transformRawJson(msg);
      const curlCmd = generateCurl(webhook, payload);
    setRaw(curlCmd);
  }, [msg]);

    function transformRawJson(raw: any): WebhookParams {
  return {
    content: raw.content || "",
    username: raw.username || "",
    avatar_url: raw.avatar_url || "",
    tts: !!raw.tts,
    embeds: (raw.embeds || []).map((embed: any) => ({
      url: embed.url,
      title: embed.title,
      description: embed.description,
      color: embed.color,
        image: embed.image ? { url: embed.image.url } : undefined,
        footer: embed.footer ? { text: embed.footer.text, icon_url: embed.footer.icon_url } : undefined,
      timestamp: embed.timestamp,
      fields: embed.fields
        ? embed.fields.map((f: any) => ({
            name: f.name,
            value: f.value,
            inline: f.inline,
          }))
        : [],
    })),
    components: raw.components || [],
    flags: raw.flags || 0,
  };
    }
    
  function save() {
    try {
    //   const data = JSON.parse(raw);
    //   const parsedData = parseMessageWithAction(data);

    //   msg.replace(parsedData);
    //   navigate("/editor");
    } catch (e) {
      console.error(e);
      createToast({
        type: "error",
        title: "Failed to parse message",
        message:
          "The message you entered is not a valid Discord webhook message. Please check for mistakes in your message and try again.",
      });
    }
  }
    
    function generateCurl(webhookUrl: string, payload: WebhookParams): string {
  const jsonPayload = JSON.stringify(payload)
    .replace(/\\/g, "\\\\") // escape backslashes
    .replace(/"/g, '\\"');  // escape quotes for shell
  return `curl -X POST "${webhookUrl}" \
-H "Content-Type: application/json" \
-d "${jsonPayload}"`;
}

  return (
    <Modal height="full" onClose={() => navigate("/editor")}>
      <div className="h-full flex flex-col p-1.5 md:p-3">
        <ReactCodeMirror
          className="flex-1 rounded overflow-hidden"
          height="100%"
          width="100%"
          value={raw}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            indentOnInput: true,
          }}
          extensions={[lintGutter(), json(), linter(jsonParseLinter())]}
          theme={githubDark}
          onChange={(v) => setRaw(v)}
        />
        <div className="mt-3 flex justify-end space-x-2">
          <button
            className="border-2 border-dark-7 hover:bg-dark-5 px-3 py-2 rounded text-white"
            onClick={() => navigate("/editor")}
          >
            Cancel
          </button>
          <button
            className="bg-blurple hover:bg-blurple-dark px-3 py-2 rounded text-white"
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
