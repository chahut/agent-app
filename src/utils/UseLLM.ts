import { useState } from "react";

export interface Message {
  sender: "user" | "bot";
  content: string;
}

export const useLLM = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState<string>("default-model");

  const sendMessage = async (message: string): Promise<void> => {
    // Simule l'envoi d'un message et la réception d'une réponse du LLM
  };

  const changeModel = (newModel: string) => {
    // Permet de changer le modèle utilisé par le LLM
  };

  return { messages, sendMessage, changeModel, model };
};

// Fonction simulant une réponse du LLM (remplacez-la par un appel réel si besoin)
const simulateLLMResponse = (
  message: string,
  model: string
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Réponse du ${model} à "${message}"`), 1000);
  });
};
