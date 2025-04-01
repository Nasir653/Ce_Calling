import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const APP_ID = "d2ebd95526a2473888bfebb588c918d9"; // Replace with your Agora App ID

const VideoCall = ({ userId }) => {
    const client = useRef(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [joined, setJoined] = useState(false);
    const [callId, setCallId] = useState(null);

    const joinCall = async () => {
        try {
            // Fetch token from your Strapi backend
            const res = await axios.post("http://localhost:1337/api/call/generate-token", {
                channelName: "testChannel",
                uid: userId,
                role: 1
            });
            const { token, channelName, uid, callId } = res.data;
            setCallId(callId);
            console.log("Joining video call with:", { token, channelName, uid });

            await client.current.join(APP_ID, channelName, token, uid);

            // Create and publish local video track
            const localTrack = await AgoraRTC.createCameraVideoTrack();
            localTrack.play(localVideoRef.current);
            await client.current.publish([localTrack]);

            setJoined(true);

            client.current.on("user-published", async (user, mediaType) => {
                await client.current.subscribe(user, mediaType);
                if (mediaType === "video") {
                    user.videoTrack.play(remoteVideoRef.current);
                }
            });
        } catch (error) {
            console.error("Error joining video call:", error);
        }
    };

    const leaveCall = async () => {
        try {
            await client.current.leave();
            setJoined(false);
            // Optionally, notify your backend to end the call
            if (callId) {
                await axios.post("http://localhost:1337/api/call/end", { callId });
            }
        } catch (error) {
            console.error("Error leaving video call:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Video Call</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "300px", height: "200px", background: "black", margin: "10px" }} ref={localVideoRef}></div>
                <div style={{ width: "300px", height: "200px", background: "black", margin: "10px" }} ref={remoteVideoRef}></div>
            </div>
            {!joined ? (
                <button onClick={joinCall}>Join Video Call</button>
            ) : (
                <button onClick={leaveCall}>Leave Video Call</button>
            )}
        </div>
    );
};

export default VideoCall;
