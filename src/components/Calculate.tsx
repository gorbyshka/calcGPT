import {
    ChatContainer,
    ChatBox,
    BotMessage,
    UserInputForm,
    UserInput,
    Name,
    SubmitButton
} from "../assets/style/calculateStyle.style";

import { useCalculateLogic } from "../utils/calculateUtlis";

export const CalcGPT: React.FC = () => {

    const { userInput, botResponse, handleUserInput, handleSubmit } = useCalculateLogic();

    return (

        <ChatContainer>

            <ChatBox>

                <>

                    <Name title="
                            ДЛЯ ВЫЧИСЛЕНИЯ ЛОГАРИФМ ИСПОЛЬЗУЙТЕ ФОРМАТ: реши логарифм(основание, число)
                            ДЛЯ ВЫЧИСЛЕНИЯ ТРИГОНОМЕТРИЧЕСКИХ ФУНКЦИЙ ИСПОЛЬЗУЙТЕ ФОРМАТ: реши тригонометрию(функция, угол) 
                            ">

                        CalcGPT

                    </Name>

                </>

                <>

                    <div className="chat-messages">

                        {botResponse && <BotMessage>{botResponse}</BotMessage>}

                    </div>

                    <UserInputForm onSubmit={handleSubmit}>

                        <UserInput
                            type="text"
                            placeholder="Введите ваш пример..."
                            value={userInput}
                            onChange={handleUserInput}
                        />

                        <SubmitButton type="submit">

                            Отправить

                        </SubmitButton>

                    </UserInputForm>

                </>

            </ChatBox>

        </ChatContainer>

    );

};
