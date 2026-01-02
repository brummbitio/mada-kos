import { Button } from "@/components/ui/Button";

interface BookingWidgetProps {
    price: string;
    period: string;
}

export const BookingWidget = ({ price, period = "/bulan" }: BookingWidgetProps) => {
    return (
        <div className="sticky top-28 p-6 rounded-2xl border border-neutral-200 shadow-sm bg-white">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-xs text-neutral-500 block mb-1">Mulai dari</span>
                    <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold text-primary-violet">{price}</span>
                        <span className="text-neutral-500 mb-1 text-sm">{period}</span>
                    </div>
                </div>
            </div>

            {/* Date Pickers (Visual Only for now) */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-600">Mulai Kos</label>
                    <div className="h-10 border border-neutral-200 rounded-lg flex items-center px-3 text-sm text-neutral-600 bg-neutral-50">
                        Pilih tanggal
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-600">Durasi</label>
                    <div className="h-10 border border-neutral-200 rounded-lg flex items-center px-3 text-sm text-neutral-600 bg-neutral-50">
                        1 Bulan
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <Button className="w-full text-base font-bold" size="lg">
                    Lihat Tipe Kamar
                </Button>
                <Button variant="primary-outline" className="w-full text-base font-bold" size="lg">
                    Chat Pemilik
                </Button>
            </div>

            <p className="text-[10px] text-neutral-400 text-center mt-4">
                Tidak dikenakan biaya admin
            </p>
        </div>
    );
};
