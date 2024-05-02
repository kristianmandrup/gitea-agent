import OpenAI from "openai";

export interface IAIAdapter {
  notifyAi(message: string): Promise<void>;
}

// Generate a single chat completion
export class OpenAIAdapter implements IAIAdapter {
  // retains full chat history
  messages: any[] = [];
  client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  addToolMessage(content: string, role = "tool") {
    this.messages.push({ content, role });
  }

  addSystemMessage(content: string, role = "system") {
    this.messages.push({ content, role });
  }

  async notifyAi(message: string) {
    this.addToolMessage(message);
    return await this.getAIStreamResponse();
  }

  async getAIStreamResponse() {
    const stream = await this.client.beta.chat.completions.stream({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say this is a test" }],
      stream: true,
    });

    stream.on("content", (delta, _snapshot) => {
      this.parseChunk(delta);
    });

    const chatCompletion = await stream.finalChatCompletion();
    console.log(chatCompletion);
  }

  parseChunk(chunk: any): string[] {
    return chunk.choices[0]?.delta?.content || "";
  }
}
