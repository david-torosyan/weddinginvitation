import { useCountdown } from '../../hooks/useCountdown';

export function CountdownSection({ config }) {
  const time = useCountdown(config.wedding.date);
  const units = [['days', time.days], ['hours', time.hours], ['minutes', time.minutes], ['seconds', time.seconds]];
  return <section className="px-5 py-14 text-center sm:px-8"><p className="text-lg font-medium">{config.countdown.heading}</p>{time.finished ? <p className="display mt-5 text-2xl">Մեր օրը սկսվել է</p> : <div className="mt-3 flex justify-center gap-1 text-[clamp(1.6rem,7vw,2.4rem)] leading-none">{units.map(([key, value], index) => <div className="contents" key={key}><div><p>{value}</p><p className="mt-2 text-[.52rem] tracking-[.08em]">{config.countdown.labels[key]}</p></div>{index !== units.length - 1 && <span className="pt-1">:</span>}</div>)}</div>}</section>;
}
