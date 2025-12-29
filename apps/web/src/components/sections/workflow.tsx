export default function Workflow() {
  const steps = [
    "Cek & diagnosa",
    "Estimasi biaya",
    "Persetujuan pelanggan",
    "Pengerjaan",
    "Tes jalan",
    "Serah terima + garansi kerja",
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Alur Kerja
        </h2>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div className="mb-5 flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-[0.5rem] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              <p className="text-center font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
