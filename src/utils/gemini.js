import { GoogleGenerativeAI } from '@google/generative-ai'
import { GEMINI_API_KEY } from './constants'

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
    // "gemini-1.5-flash" is likely retired. Use the current stable version:
    model: 'gemini-2.5-flash',
})

export const askGemini = async (prompt) => {
    try {
        const result = await model.generateContent(prompt)
        return result.response.text()
    } catch (err) {
        console.error('Gemini API Error: ', err)
        return null
    }
}
