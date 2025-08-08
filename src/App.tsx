import { lazy, ReactNode, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "./util/toasts";
import EditorView from "./views/editor/editor";
import RequestLoadingIndicator from "./components/RequestLoadingIndicator";
import ClearView from "./views/editor/clear";
import ShareView from "./views/editor/share";
import EditorSideNav from "./components/SideNav";
import ActivityLoadingScreen from "./components/ActivityLoadingScreen";
import "./util/activity";
import UpsellPopup from "./components/UpsellPopup";
import ConfirmOnExit from "./components/ConfirmOnExit";

const LazyJsonView = lazy(() => import("./views/editor/json"));
const LazyCurlView = lazy(() => import("./views/editor/curl"));
const LazySendMessageView = lazy(() => import("./views/editor/sendmessage"));

const LazyAssistantView = lazy(() => import("./views/editor/assisstant"));
const LazyMessagesView = lazy(() => import("./views/messages"));
const LazyPremiumView = lazy(() => import("./views/premium"));
const LazyShareRestoreView = lazy(() => import("./views/editor/shareRestore"));
const LazySettingsView = lazy(() => import("./views/settings"));
const LazyCommandsView = lazy(() => import("./views/commands"));
const LazyToolsView = lazy(() => import("./views/tools"));
const LazyColoredTextToolView = lazy(() => import("./views/tools/coloredText"));
const LazyWebhookInfoToolView = lazy(() => import("./views/tools/webhookInfo"));
const LazyEmbedLinksToolView = lazy(() => import("./views/tools/embedLinks"));

function SuspendedView({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}

function App() {
  return (
    <div className="h-[100dvh] w-[100dvw] overflow-y-auto">
      <RequestLoadingIndicator />
      <ActivityLoadingScreen />
      <UpsellPopup />
      <ConfirmOnExit />
      <div className="flex h-full">
        <EditorSideNav />
        <Routes>
          <Route path="/editor" element={<EditorView />}>
            <Route path="clear" element={<ClearView />} />
            <Route
              path="json"
              element={
                <SuspendedView>
                  <LazyJsonView />
                </SuspendedView>
              }
            />
            <Route
              path="curl"
              element={
                <SuspendedView>
                  <LazyCurlView />
                </SuspendedView>
              }
            />
            <Route
              path="sendmessage"
              element={
                <SuspendedView>
                  <LazySendMessageView />
                </SuspendedView>
              }
            />

          </Route>


          <Route
            path="*"
            element={
              <Navigate
                replace
                to={{
                  pathname: "/editor",
                  search: location.search,
                }}
              />
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
