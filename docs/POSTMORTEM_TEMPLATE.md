# Incident: [короткое название] [INC-YYYY-MMDD-shortname]

**Severity:** SEV-1 (down) / SEV-2 (broken feature) / SEV-3 (cosmetic)
**Дата:** YYYY-MM-DD
**Длительность:** HH:MM-HH:MM MSK (NN мин)

## Impact
- N клиентов задело: __
- Потеря денег: ~₽__
- SLO impact: error budget сожжён на N% за месяц

## Timeline (UTC+3)
| Время | Событие |
|-------|---------|
|  | Sentry alert: ... |
|  | Я начал debug, открыл Replay |
|  | Нашёл — ... |
|  | git revert + redeploy |
|  | Метрики в норме |

## Root Cause (5 Whys)
1. ... **Почему?**
2. ... **Почему?**
3. ... **Почему?**
4. ... **Почему?**
5. ...

## Что сделано хорошо
- Sentry отловил за __ мин до первого письма от клиента
- Revert занял < __ мин

## Что плохо
- Нет integration-теста на ...
- Нет canary-деплоя — катит на 100% сразу

## Action items (max 3, иначе никто не сделает)
- [ ] Добавить fixture: ... (deadline: ____)
- [ ] Включить feature-flag `_____` через Postgres-таблицу (deadline: ____)
- [ ] (НЕ делать сразу) Canary-деплой через ... — на следующий месяц

---

**Принципы** (источник: sre.google/sre-book/postmortem-culture, oneuptime.com SRE
Postmortem Templates, RESEARCH_testing_bugfixing_2026 §2.4):

- **Blameless** — даже если автор инцидента это ты сам, формулировки «я не
  прочитал доку» переписывайте на «система не имела теста, который бы
  отловил пропущенный X».
- **Не больше 3 action items** — иначе они не делаются (Google SRE Workbook).
- **Postmortem пишется в течение 24 часов**, потом память деградирует.
