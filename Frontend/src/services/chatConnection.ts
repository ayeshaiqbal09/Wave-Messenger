import {
    HubConnectionBuilder,
    LogLevel
} from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7061/hubs/chat", {
        accessTokenFactory: () =>
            localStorage.getItem("token") ?? ""
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

export default connection;