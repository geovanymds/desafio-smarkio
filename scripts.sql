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

-- TOTAL DE MENSAGENS ENVIADAS POR INTENÇÃO EM JULHO
SELECT i.name, COUNT(m.id),m.status AS total FROM chatbot.intentions i
JOIN chatbot.messages m ON i.id=m.intention_id WHERE i.name='Sed similique sequi ut magnam.' AND m.date 
BETWEEN '2020-07-01' AND '2020-07-31' GROUP BY m.status;

-- INTENÇÕES COM MAIOR % DE APROVAÇÃO EM JULHO
SELECT i.name,COUNT(m.id)/i.total AS percent FROM chatbot.intentions i JOIN chatbot.messages m 
ON i.id=m.intention_id WHERE m.status='aprovada' GROUP BY i.id ORDER BY percent DESC;