export class Marker {
    id?: number;
    lat: number;
    lng: number;
    title: string;
    description: string;
    label?: string;
    draggable?: boolean;
    dateStart?: string;
    dateEnd?: string;
    animation?: 'DROP' | 'BOUNCE' | '';
}
