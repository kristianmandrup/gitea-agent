import { OpenAIClient } from "openai-fetch";
import { ChatMessage, Role } from "openai-fetch/dist/types";
import { ChatCompletion } from "openai-fetch/openai-types/resources";

export interface IAIAdapter {
  notifyAi(message: string): Promise<ChatCompletion.Choice>;
}

// Generate a single chat completion
export class OpenAIAdapter implements IAIAdapter {
  // retains full chat history
  messages: ChatMessage[] = [];
  client: OpenAIClient;
  tools: any[] = [];

  constructor() {
    this.client = new OpenAIClient({ apiKey: process.env.OPENAI_API_KEY });
  }

  setTools(tools: any) {
    this.tools = tools;
    return this;
  }

  asTool(definition: any) {
    return {
      type: "function",
      function: definition,
    };
  }

  addTools(definitions: any[]) {
    for (const def of definitions) {
      this.addTool(def);
    }
  }

  addTool(definition: any) {
    const tool = this.asTool(definition);
    this.tools.push(tool);
  }

  addToolMessage(content: string, role: Role = "tool") {
    this.messages.push({ content, role });
  }

  addSystemMessage(content: string | null, role: Role = "system") {
    if (!content) return;
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
      tools: this.tools,
      tool_choice: "auto",
    });
  }

  parseResponseContent(completion: ChatCompletion) {
    const { choices } = completion;
    return choices[0];
  }

  getMessage(choice: ChatCompletion.Choice) {
    return choice.message;
  }

  async getChatCompletion() {
    const response = await this.getAIResponse();
    const choice = this.parseResponseContent(response);
    this.addSystemMessage(choice.message.content);
    return choice;
  }
}
