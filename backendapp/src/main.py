from flask import Flask, request, jsonify
from semantic_kernel import Kernel
from semantic_kernel.connectors.ai.chat_completion_client_base import ChatCompletionClientBase
from semantic_kernel.connectors.ai.open_ai import (OpenAIChatCompletion,
                                                   OpenAIChatPromptExecutionSettings)
from semantic_kernel.connectors.ai.function_choice_behavior import FunctionChoiceBehavior
from semantic_kernel.contents import ChatHistory
from semantic_kernel.connectors.mcp import MCPStreamableHttpPlugin

from openai import AsyncOpenAI
from llm import *
import asyncio
from dotenv import load_dotenv
from plugins.dateTimePlugin import DateTimePlugin
from plugins.webSearchPlugin import WebSearchPlugin
from prompts import GeneralPrompt

load_dotenv()
app = Flask(__name__)
kernel = Kernel()
history = ChatHistory()

@app.route('/llmResponse', methods=['GET'])
def llmResponse():
    query = request.args.get('question')
    print(query)
    llm_client = getDeepseekChatModel()

    async def get_response():
        try:
            kernel.get_service("QWEN_AI_AGENT")
            # kernel.get_service("DeepSeek-AI-AGENT")
        except:
            kernel.add_service(OpenAIChatCompletion(
                service_id= "QWEN_AI_AGENT",
                ai_model_id= os.environ.get("QWEN_MODEL_NAME"),
                async_client= AsyncOpenAI(
                    api_key= os.environ.get("QWEN_API_KEY2"),
                    base_url= os.environ.get("BASE_URL")
                )
            ))

        try:
            plugin = MCPStreamableHttpPlugin(
                name="CricketMCP",
                description= "Cricket MCP tools",
                url= "http://127.0.0.1:5000/mcp",
                headers={
                    "accept": "application/json, text/event-stream",
                    "content-Type": "application/json"
                }
            )
            await plugin.connect()
            kernel.add_plugin(plugin)

        except Exception as exe:
            print("exception Occoured: "+ str(exe))

        try:
            plugin1 = MCPStreamableHttpPlugin(
                name="XMCP",
                description= "X platform MCP tool",
                url= "http://127.0.0.1:8001/mcp",
                headers={
                    "accept": "application/json, text/event-stream",
                    "content-Type": "application/json"
                }
            )
            await plugin1.connect()
            kernel.add_plugin(plugin1)

        except Exception as exe:
            print("exception Occoured: "+ str(exe))

        kernel.add_plugin(DateTimePlugin(), plugin_name= "DateTime")
        kernel.add_plugin(WebSearchPlugin(), plugin_name= "WebSearch")

        setting = OpenAIChatPromptExecutionSettings()
        setting.function_choice_behavior = FunctionChoiceBehavior.Auto()

        chat_completion: OpenAIChatCompletion = kernel.get_service(type=ChatCompletionClientBase)
        
        history.add_system_message(GeneralPrompt)
        history.add_user_message(query)
        
        try:
            response = await chat_completion.get_chat_message_content(
                chat_history= history,
                settings= setting,
                kernel = kernel,
            )
            history.add_message(response)
        finally:
            await plugin.close()
            await plugin1.close()
        return response

    try:
        response = asyncio.run(get_response())
        return jsonify({'response': response.content}), 200
    except Exception as exc:
        return jsonify({'error_occurred': str(exc)}), 500
    
if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', port=8000, debug=True)
    except Exception as exc:
        print(exc)