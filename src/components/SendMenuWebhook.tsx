import { useMemo, useState } from "react";
import {
  useSendMessageToWebhookMutation,
} from "../api/mutations";
import { useCurrentMessageStore } from "../state/message";
import { useValidationErrorStore } from "../state/validationError";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useCurrentAttachmentsStore } from "../state/attachments";
import { useSendSettingsStore } from "../state/sendSettings";
import { shallow } from "zustand/shallow";
import { messageUrlRegex, parseWebhookUrl } from "../discord/util";
import MessageRestoreButton from "./MessageRestoreButton";
import { useToasts } from "../util/toasts";

export default function SendMenuWebhook() {
  const validationError = useValidationErrorStore((state) =>
    state.checkIssueByPathPrefix("")
  );

  const [webhookUrl, setWebhookUrl] = useSendSettingsStore(
    (state) => [state.webhookUrl, state.setWebhookUrl],
    shallow
  );
  const webhookInfo = useMemo(() => {
    if (!webhookUrl) return null;
    return parseWebhookUrl(webhookUrl);
  }, [webhookUrl]);

  const [messageId, setMessageId] = useSendSettingsStore(
    (state) => [state.messageId, state.setMessageId],
    shallow
  );
  const [threadId, setThreadId] = useSendSettingsStore(
    (state) => [state.threadId, state.setThreadId],
    shallow
  );

  const sendToWebhookMutation = useSendMessageToWebhookMutation();

  function handleMessageId(val: string) {
    if (!val) {
      setMessageId(null);
      return;
    }

    const match = val.match(messageUrlRegex);
    if (match) {
      setMessageId(match[2]);
    } else {
      setMessageId(val);
    }
  }

  const createToast = useToasts((state) => state.create);

  function send(edit: boolean) {
    if (validationError || !webhookInfo) return;

    sendToWebhookMutation.mutate(
      {
        webhook_type: webhookInfo.type,
        webhook_id: webhookInfo.id,
        webhook_token: webhookInfo.token,
        message_id: edit ? messageId : null,
        thread_id: threadId,
        data: useCurrentMessageStore.getState(),
        attachments: useCurrentAttachmentsStore.getState().attachments,
      },
      {
        onSuccess: (resp) => {
          if (resp.success) {
            setMessageId(resp.data.message_id);
            createToast({
              type: "success",
              title: "Message has been sent",
              message: "The message has been sent to the given webhook!",
            });
          } else {
            createToast({
              type: "error",
              title: "Failed to send message",
              message: resp.error.message,
            });
          }
        },
      }
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex">
        <div className="flex-auto">
          <div className="uppercase text-gray-300 text-sm font-medium mb-1.5">
            Webhook URL
          </div>
          <input
            type="url"
            className="bg-dark-2 px-3 py-2 rounded w-full focus:outline-none text-white"
            onChange={(e) => setWebhookUrl(e.target.value || null)}
            value={webhookUrl || ""}
          />
        </div>
      </div>
      <div>
        {validationError && (
          <div className="flex items-center text-red space-x-1">
            <ExclamationCircleIcon className="h-5 w-5" />
            <div>
              There are errors in your message, you have to fix them before
              sending the message.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
