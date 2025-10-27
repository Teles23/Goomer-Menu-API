export const DIAS_SEMANA = [
  "DOMINGO",
  "SEGUNDA",
  "TERCA",
  "QUARTA",
  "QUINTA",
  "SEXTA",
  "SABADO",
] as const;

export function getCurrentDayAndTime() {
  const now = new Date();
  const today = DIAS_SEMANA[now.getDay()];
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  return { today, time };
}

export function isPromotionActive(
  diaSemana: string,
  horaInicio: string,
  horaFim: string
): boolean {
  const { today, time } = getCurrentDayAndTime();
  return diaSemana === today && horaInicio <= time && time <= horaFim;
}
