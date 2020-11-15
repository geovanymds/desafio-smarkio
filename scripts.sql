-- TOTAL DE USUÁRIOS QUE ACESSARAM NO MÊS DE JULHO
SELECT COUNT(u.id) AS total FROM chatbot.users u WHERE
u.date BETWEEN '2020-07-01' AND '2020-07-31';

-- FEITO

-- TOTAL DE MENSAGENS ENVIADAS POR USUÁRIO EM JULHO
SELECT u.name, COUNT(m.id) AS total FROM chatbot.users u
JOIN chatbot.messages m ON u.id=m.user_id WHERE m.date 
BETWEEN '2020-07-01' AND '2020-07-31'GROUP BY u.name;

-- FEITO

-- TOTAL DE MENSAGENS ENVIADAS POR INTENÇÃO EM JULHO
SELECT i.name, COUNT(m.id) AS total FROM chatbot.intentions i
JOIN chatbot.messages m ON i.id=m.intention_id WHERE m.date 
BETWEEN '2020-07-01' AND '2020-07-31'GROUP BY i.name;

-- FEITO

-- TOTAL DE MENSAGENS ENVIADAS POR INTENÇÃO ESPECÍFICA EM JULHO
SELECT i.name, COUNT(m.id) AS total,m.status AS status FROM chatbot.intentions i
JOIN chatbot.messages m ON i.id=m.intention_id WHERE i.name='Sed similique sequi ut magnam.' AND m.date 
BETWEEN '2020-07-01' AND '2020-07-31' GROUP BY m.status;

--FEITO

-- -- INTENÇÕES COM MAIOR % DE APROVAÇÃO EM JULHO
SELECT 100 * (COUNT(CASE WHEN status = 'aprovada' THEN 1 END) / COUNT(*)) AS percent
FROM chatbot.messages m WHERE m.date BETWEEN '2020-07-01' AND '2020-07-31' 
GROUP BY m.intention_id ORDER BY percent DESC LIMIT 10;

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

--FEITO