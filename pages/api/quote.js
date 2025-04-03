// pages/api/quote.js

export default async function handler(req, res) {
    const { action } = req.query;

    try {
        const response = await fetch(`https://brapi.com.br/api/quote/${action}?token=gzt1E342VQo1gcijzdazAF`);
        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(500).json({ error: 'Erro ao buscar dados da API externa' });
        }
    } catch (error) {
        console.error('Erro na API:', error);
        return res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
}
