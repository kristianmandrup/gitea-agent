import { OpenAIClient } from "openai-fetch";
import { ChatMessage, Role } from "openai-fetch/dist/types";
import { ChatCompletion } from "openai-fetch/openai-types/resources";

export interface IAIAdapter {
  notifyAi(message: string): Promise<string>;
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
    return await this.getChatCompletion(this.messages);
  }

  async getAIResponse() {
    return await this.client.createChatCompletion({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: this.messages,
    });
  }

  parseResponseContent(completion: ChatCompletion) {
    const { choices } = completion;
    const choice = choices[0];
    return choice.message.content ? choice.message.content : undefined;
  }

  async getChatCompletion(messages: ChatMessage[]): Promise<string> {
    const response = await this.getAIResponse();
    const content = this.parseResponseContent(response);
    const sysMessage = `${content}`;
    this.addSystemMessage(sysMessage);
    return sysMessage;
  }
}
