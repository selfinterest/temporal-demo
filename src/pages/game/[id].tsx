// pages/game.tsx
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

const GameScreen: React.FC = () => {
  async function submitBid() {
    const response = await fetch(`/api/game/${gameId}/submit-bid`, {
      method: "post",
      body: JSON.stringify({
        gameId,
        email,
        bid,
        paymentMethod,
      }),
    });
    const data = await response.json();
    return data;
  }
  const mutation = useMutation({
    mutationFn: submitBid,
    onSuccess: async (data) => {
      // Handle the data on success
      if (data.ok) {
      } else {
        //setGameError("Game not found");
      }
    },
    onError: (error) => {
      // Handle any errors
      console.error("Error fetching data:", error);
    },
  });
  const [gameId, setGameId] = useState<string | null>(null);
  const router = useRouter();

  // Load the gameId from cookies when the component mounts
  useEffect(() => {
    const id = Cookies.get("gameId");
    if (id) {
      setGameId(id);
    } else {
      router.push("/"); // Redirect to game selection if no gameId is present
    }
  }, [router]);

  const handleLeaveGame = () => {
    Cookies.remove("gameId"); // Remove the gameId cookie
    Cookies.remove("gameExpiration");
    router.push("/"); // Redirect to the game selection screen
  };

  const [paymentMethod, setPaymentMethod] = useState<string>("venmo");
  const [paymentId, setPaymentId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bid, setBid] = useState<number>(5);

  const handleBidSubmit = () => {
    // Handle bid submission (e.g., validation, sending data)
    //alert(`Bid submitted: $${bid} via ${paymentMethod}`);
    mutation.mutate();
  };

  // Check if the Submit button should be enabled
  const isSubmitDisabled = paymentId.trim() === "" || email.trim() === "";
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-lg font-semibold">
          Game ID: <span className="font-mono text-xl">{gameId}</span>
        </h1>
        <button
          onClick={handleLeaveGame}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold"
        >
          Leave Game
        </button>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Instructions */}
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-1 text-center">Instructions</h2>
            <p className="text-sm text-center">
              To place your bid, select your preferred payment method, enter
              your payment ID and email address, and choose a bid amount between
              $5 and $100.
            </p>
            <p className="text-sm text-center">
              If <i>total</i> bids go over $100, nobody gets anything. If bids
              stay at $100 or under, people get what they bid. Money will be
              sent using preferred payment method.
            </p>
            <p className="text-sm text-center">
              Click "Submit Bid" to finalize your entry. Good luck!
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Place Your Bid
          </h2>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Select Payment Method:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="venmo"
                  checked={paymentMethod === "venmo"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Venmo
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="squarecash"
                  checked={paymentMethod === "squarecash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                SquareCash
              </label>
            </div>
          </div>

          {/* Payment ID Field */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              {paymentMethod === "venmo" ? "Venmo ID" : "SquareCash ID"}
            </label>
            <input
              type="text"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              placeholder={
                paymentMethod === "venmo"
                  ? "Enter Venmo ID"
                  : "Enter SquareCash ID"
              }
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bid Dropdown */}
          <div className="mb-6">
            <label className="block font-semibold mb-1">
              Select Bid Amount
            </label>
            <select
              value={bid}
              onChange={(e) => setBid(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(20)].map((_, i) => (
                <option key={i} value={(i + 1) * 5}>
                  ${(i + 1) * 5}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleBidSubmit}
            disabled={isSubmitDisabled}
            className={`w-full py-2 rounded font-semibold transition-colors ${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Submit Bid
          </button>
        </div>
      </main>
    </div>
  );
};

export default GameScreen;
