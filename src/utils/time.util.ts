function parseTime(timeStr: string): number {
  const parts = timeStr.split(":");
  if (parts.length !== 2) {
    throw new Error(`Formato de hora inválido: ${timeStr}. Use HH:MM`);
  }

  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error(`Hora ou minutos inválidos em: ${timeStr}`);
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`Hora fora do intervalo válido: ${timeStr}`);
  }

  return hours * 60 + minutes;
}

export function validateTimeInterval(
  horaInicio: string,
  horaFim: string
): boolean {
  const inicioMinutes = parseTime(horaInicio);
  const fimMinutes = parseTime(horaFim);
  const diffMinutes = fimMinutes - inicioMinutes;

  return diffMinutes >= 15;
}
