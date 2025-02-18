import { APIRequestContext } from '@playwright/test';

export class EmailCopHelper {
    private request: APIRequestContext;
    private inboxId: string;
    private token: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.inboxId = '67ae172d1a36c500131ec80e';
        this.token = 'd3bedaed336773e7460d5b4577750b54';
    }
   

    //Прочитать Email
    async readEmails(email: string, subject: string, timeout: number = 60000, interval: number = 5000): Promise<any[]> {
        const searchQuery = `mail.to.address:${email};mail.subject:${subject}`;
        const url = `https://mailcap.of-it.org/api/v1/inboxes/${this.inboxId}/messages?search=${encodeURIComponent(searchQuery)}`;

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            const response = await this.request.get(url, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.status() !== 200) {
                throw new Error("Failed to fetch emails");
            }

            const data = await response.json();

            if (data.length > 0) {
                console.log("Email найден!");
                return data;
            }

            console.log("Ожидание письма...");
            await new Promise(resolve => setTimeout(resolve, interval));
        }

        console.log("Timeout: Письмо не найдено за отведенное время");
        return [];
    }
    

    //Исвлечь нужную ссылку из письма
    async extractLink(email: string, subject: string): Promise<string | null> {
        try {
            const emails = await this.readEmails(email, subject);
            if (!emails.length || !emails[0]?.mail?.text) {
                return null;
            }
    
            const textEmail: string = emails[0].mail.text;
            const regex = /\[([^\]]+)\]/g;
            const links = textEmail.match(regex);
    
            if (!links) {
                console.log("Жодних посилань не знайдено в тексті листа.");
                return null;
            }
    
            const regex2 = /\[https:\/\/cdpjdfciwmhoefhqahgt\.supabase\.co\/auth\/v1\/[^\]]+\]/;
            const extractedLink = links.find(link => regex2.test(link));
    
            if (extractedLink) {
                // Видаляємо квадратні дужки та повертаємо посилання
                return extractedLink.replace(/\[|\]/g, '');
            } else {
                console.log("Ссылка не найдена");
                return null;
            }
        } catch (error) {
            console.error("Помилка при вилученні посилання:", error);
            return null;
        }
    }

}