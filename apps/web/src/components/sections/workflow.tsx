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
    <section className="py-16 md:py-32 bg-gradient-to-b from-muted/30 to-background animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-2xl font-bold text-center md:text-4xl">
          Alur Kerja
        </h2>
        <div className="grid gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <div key={step} className="relative flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 md:h-[3.125rem] md:w-[3.125rem] items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-110 z-10 relative">
                {index + 1}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 left-full -translate-y-1/2 ml-4 text-primary text-3xl z-0">
                    ⟶
                  </div>
                )}
              </div>
              <p className="text-center font-medium text-sm md:text-base">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
