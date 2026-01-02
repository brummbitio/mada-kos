import Image from "next/image";
import { Check, CheckCircle2 } from "lucide-react";
import { PropertyDetail, RoomType } from "@/data/properties";

interface RoomListProps {
    rooms: RoomType[];
}

export const RoomList = ({ rooms }: RoomListProps) => {
    return (
        <div className="space-y-6">
            {rooms.map((room) => (
                <div key={room.id} className="border border-neutral-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:border-primary-violet/50 transition-colors">
                    {/* Room Image */}
                    <div className="w-full md:w-64 h-48 md:h-auto relative rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                            src={room.images[0]}
                            alt={room.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-neutral-800">
                            {room.available ? "Tersedia" : "Penuh"}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-bold text-neutral-900">{room.name}</h4>
                        </div>

                        <p className="text-sm text-neutral-500 mb-4">{room.description}</p>

                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
                            {room.facilities.map((fac, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                                    <CheckCircle2 size={14} className="text-primary-violet" />
                                    <span>{fac}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-dashed border-neutral-100 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                            <div>
                                <span className="text-xs text-neutral-400 block mb-1">Mulai dari</span>
                                <div className="flex items-end gap-1">
                                    <span className="text-lg font-bold text-neutral-900">{room.price}</span>
                                    <span className="text-xs text-neutral-500 mb-1">{room.period}</span>
                                </div>
                            </div>

                            <button className="w-full md:w-auto px-6 py-2.5 bg-primary-yellow hover:bg-primary-yellow-700 text-white text-sm font-bold rounded-lg transition-colors">
                                Lihat Kamar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
