-- ESTATÍSTICA DESCRITIVA
SET @qntMonths = (SELECT COUNT(DISTINCT EXTRACT(MONTH FROM m.date)) FROM chatbot.messages m);
SELECT
(SELECT COUNT(m.id) FROM chatbot.messages m) AS 'Total de mensagens',
(SELECT COUNT(m.id) FROM chatbot.messages m)/@qntMonths AS 'Média de mensagens por mês',
(SELECT COUNT(m.id) FROM chatbot.messages m WHERE m.status='aprovada') AS 'Aprovadas',
(SELECT COUNT(m.id) FROM chatbot.messages m WHERE m.status='nova') AS 'Novas',
(SELECT COUNT(m.id) FROM chatbot.messages m WHERE m.status='corrigida') AS 'Corrigidas',
(SELECT COUNT(m.id) FROM chatbot.messages m WHERE m.status='aprovada')/@qntMonths AS 'Média de Aprovadas',
(SELECT COUNT(m.id) FROM chatbot.messages m WHERE m.status='nova')/@qntMonths AS 'Média de Novas',
(SELECT COUNT(m.id) FROM chatbot.messages m WHERE m.status='corrigida')/@qntMonths AS 'Média de Corrigidas',
(SELECT m.status FROM chatbot.messages m GROUP BY m.status ORDER BY COUNT(m.id) DESC LIMIT 1) AS 'Moda',
(SELECT STD(qtd_month) FROM (SELECT COUNT(m.id) AS qtd_month FROM chatbot.messages m GROUP BY m.status) AS subquery) AS 'Desvio Padrão',
(SELECT VARIANCE(qtd_month) FROM (SELECT COUNT(m.id) AS qtd_month FROM chatbot.messages m GROUP BY m.status) AS subquery) AS 'Variancia';