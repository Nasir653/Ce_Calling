import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const APP_ID = "d2ebd95526a2473888bfebb588c918d9"; // Replace with your Agora App ID

const VoiceCall = ({ userId }) => {
    const client = useRef(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
    const [joined, setJoined] = useState(false);
    const [callId, setCallId] = useState(null);

    const joinCall = async () => {
        try {
            // Fetch token from your backend
            const res = await axios.post("http://localhost:1337/api/call/generate-token", {
                channelName: "testChannel",
                uid: userId,
                role: 1
            });
            const { token, channelName, uid, callId } = res.data;
            setCallId(callId);
            console.log("Joining voice call with:", { token, channelName, uid });

            await client.current.join(APP_ID, channelName, token, uid);

            // Create and publish local audio track
            const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            await client.current.publish([localAudioTrack]);

            setJoined(true);

            // Listen for remote users' audio tracks
            client.current.on("user-published", async (user, mediaType) => {
                await client.current.subscribe(user, mediaType);
                if (mediaType === "audio" && user.audioTrack) {
                    user.audioTrack.play();
                }
            });
        } catch (error) {
            console.error("Error joining voice call:", error);
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
            console.error("Error leaving voice call:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Voice Call</h2>
            {!joined ? (
                <button onClick={joinCall}>Join Voice Call</button>
            ) : (
                <button onClick={leaveCall}>Leave Voice Call</button>
            )}
        </div>
    );
};

export default VoiceCall;
