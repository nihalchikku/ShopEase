import { useState } from "react";
import axios from "axios";

function ChatBot() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi👋 How can I help you?"
        }
    ]);


    // const handleSend = async () => {

    //     const userMessage =String(message || "").trim();
    //     if(!userMessage) return;

    //     setMessages((prev) => [
    //         ...prev,
    //         {
    //             sender: "user",
    //             text: userMessage
    //         }
    //     ]);

    //     setMessage("");

    //     // Check order status
    //     const orderMatch = userMessage.match(/(?:order\s*(?:status)?\s*#?|#)([a-fA-F0-9]{24})/i);

    //     if(orderMatch) {
    //         const orderId = orderMatch[1];

    //         try {
    //             const token = localStorage.getItem("token");

    //             const res = await axios.get(
    //                 `http://localhost:5000/api/orders/status/${orderId}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );

    //             setMessages((prev) => 
    //             [
    //                 ...prev,
    //                 {
    //                     sender:
    //                     "bot",
    //                     text: `📦 Your order #${orderId} is currently ${res.data.orderStatus}.`
    //                 }
    //             ]);
    //         } catch (error) {
    //             setMessages((prev) => 
    //             [
    //                 ...prev,
    //                 {
    //                     sender:
    //                     "bot",
    //                     text:
    //                     error.response?.data?.message || 
    //                     "Sorry, I couldn't find that order."
    //                 }
    //             ]);
    //         }

    //         return;
    //     }

    //     // Basic replies
    //     setTimeout(() => {
    //         let reply = "Sorry, I didn't understand that.";

    //         if(
    //             userMessage.toLowerCase().includes("hi")||
    //             userMessage.toLowerCase().includes("hello")
    //         ) {
    //             reply = "Hello 👋 How can I help you?";
    //         } else if(
    //             userMessage.toLowerCase().includes("order")
    //         ) {
    //             reply = "Sure 👍 Please type your order ID. Example: Check order status #64a123...";
    //         } else if(
    //             userMessage.toLowerCase().includes("help")
    //         ) {
    //             reply = "You can ask me about your orders, products, or delivery.";
    //         }

    //         setMessages((prev) => [
    //             ...prev,
    //             {
    //                 sender: "bot",
    //                 text: reply
    //             }
    //         ]);
    //     },500);
    // };

    const handleSend = async () => {
        const userMessage = String(message || "").trim();

        if(!userMessage) return;

        // User message showing
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage,
            },
        ]);

        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/chat",
                {
                    message:
                    userMessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // AI response
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: res.data.reply,
                },
            ]);
        } catch (error) {
            console.log("Chat Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: error.response?.data?.message || "Sorry, something went wrong.",
                },
            ]);
        }
    };
    return (
        <>
            {/* chat button */}
            <button onClick={() => setOpen(!open)}
                className="fixed bottom-5 right-5 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-2xl z-50">
                    💬
            </button>

            {/* Chat Box */}
            {open && (
                <div className="fixed bottom-24 right-5 w-80 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">

                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                        <h2 className="font-bold">
                            ShopEase Assistant 🤖
                        </h2>

                        <button onClick={() => setOpen(false)}
                            className="text-xl">
                                ❌
                            </button>
                    </div>

                    {/* Message */}
                    <div className="h-80 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, index) => (
                            <div key={index}
                            className={`flex ${
                                msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}>
                                <div className={`px-3 py-2 rounded-lg max-w-[75%] break-words overflow-wrap-anywhere ${
                                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                                }`}>
                                    {msg.text}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Input */}

                    <div className="border-t p-3 flex gap-2">
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                handleSend();
                            }
                        }}
                        placeholder="Type a message..."
                        className="felx-1 border rounded-lg px-3 py-2 outline-none" />

                        <button onClick={handleSend}
                        className="bg-blue-600 text-white px-4 rounded-lg">Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;