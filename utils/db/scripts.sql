-- TOTAL DE USUÁRIOS QUE ACESSARAM NO MÊS DE JULHO
SELECT COUNT(u.id) AS total FROM chatbot.users u WHERE
u.date BETWEEN '2020-07-01' AND '2020-07-31';

-- TOTAL DE MENSAGENS ENVIADAS POR USUÁRIO EM JULHO
SELECT u.name, COUNT(m.id) AS total FROM chatbot.users u
JOIN chatbot.messages m ON u.id=m.user_id WHERE m.date 
BETWEEN '2020-07-01' AND '2020-07-31'GROUP BY u.name;

-- TOTAL DE MENSAGENS ENVIADAS POR INTENÇÃO EM JULHO
SELECT i.name, COUNT(m.id) AS total FROM chatbot.intentions i
JOIN chatbot.messages m ON i.id=m.intention_id WHERE m.date 
BETWEEN '2020-07-01' AND '2020-07-31'GROUP BY i.name;

-- TOTAL DE MENSAGENS ENVIADAS POR INTENÇÃO ESPECÍFICA EM JULHO
SELECT i.name, COUNT(m.id) AS total,m.status AS status FROM chatbot.intentions i
JOIN chatbot.messages m ON i.id=m.intention_id WHERE i.name='Sed similique sequi ut magnam.' AND m.date 
BETWEEN '2020-07-01' AND '2020-07-31' GROUP BY m.status;

-- -- INTENÇÕES COM MAIOR % DE APROVAÇÃO EM JULHO
SELECT 100 * (COUNT(CASE WHEN status = 'aprovada' THEN 1 END) / COUNT(*)) AS percent
FROM chatbot.messages m WHERE m.date BETWEEN '2020-07-01' AND '2020-07-31' 
GROUP BY m.intention_id ORDER BY percent DESC LIMIT 10;


