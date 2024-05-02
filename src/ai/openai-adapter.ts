import { OpenAIClient } from "openai-fetch";
import { ChatMessage, Role } from "openai-fetch/dist/types";
import { ChatCompletion } from "openai-fetch/openai-types/resources";

export interface IAIAdapter {
  notifyAi(message: string): Promise<string[]>;
}

// Generate a single chat completion
export class OpenAIAdapter implements IAIAdapter {
  // retains full chat history
  messages: ChatMessage[] = [];
  client: OpenAIClient;

  constructor() {
    this.client = new OpenAIClient({ apiKey: process.env.OPENAI_API_KEY });
  }

  addToolMessage(content: string, role: Role = "tool") {
    this.messages.push({ content, role });
  }

  addSystemMessage(content: string, role: Role = "system") {
    this.messages.push({ content, role });
  }

  async notifyAi(message: string) {
    this.addToolMessage(message);
    return await this.getChatCompletion();
  }

  async getAIResponse() {
    return await this.client.createChatCompletion({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: this.messages,
    });
  }

  parseResponseContent(completion: ChatCompletion): string[] {
    const { choices } = completion;
    return choices.map((c) => this.getContent(c)).filter((c) => c !== "");
  }

  getContent(choice: ChatCompletion.Choice) {
    return choice.message.content ? choice.message.content : "";
  }

  async getChatCompletion(): Promise<string[]> {
    const response = await this.getAIResponse();
    const contentList = this.parseResponseContent(response);
    contentList.forEach((content) => this.addSystemMessage(content));
    return contentList;
  }
}
