import React from "react"
import logo from "./assets/dfinity.svg"

import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react"
import "@connect2ic/core/style.css"

//Import canister definitions like this:
import * as toDo from "../src/declarations/toDo"

import NotConnected from "./components/NotConnected";
import TodoList from "./components/TodoList";

const client = createClient({
  canisters: {
    toDo,
  },
  providers: [
    new InternetIdentity({ providerUrl: "http://127.0.0.1:8000/?canisterId=be2us-64aaa-aaaaa-qaabq-cai" })
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: true,
  },
})

function App() {
  
  const {principal} = useConnect();

  return (
    <div className="min-h-screen">
      <header className="relative flex justify-start items-center p-4 border-b border-gray-600">
        <img src={logo} width="80" alt="logo" />
        <div className="absolute top-2 right-2">
          <ConnectButton />
        </div>
      </header>
      <ConnectDialog />

      {principal ? <TodoList/> : <NotConnected/>}
    </div>
  )
}


export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
