"use client";

import L from "leaflet";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "leaflet-control-geocoder";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
	MapContainer,
	Marker,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import type { AddressSchema } from "./zod-schema";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: "/leaflet-images/marker-icon-2x.png",
	iconUrl: "/leaflet-images/marker-icon.png",
	shadowUrl: "/leaflet-images/marker-shadow.png",
});

// Cascavel, PR fallback: lat -24.95583, lng -53.45528 :contentReference[oaicite:1]{index=1}
const DEFAULT_POS = { lat: -24.95583, lng: -53.45528 };

type LatLng = { lat: number; lng: number };

// Adds the Nominatim search box to the map
function GeocoderControl({ onSelect }: { onSelect: (p: LatLng) => void }) {
	const map = useMap();
	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const control = (L.Control as any).geocoder({
			defaultMarkGeocode: false,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			geocoder: new (L.Control as any).Geocoder.Nominatim(),
		});
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		control.on("markgeocode", (e: any) => {
			const c = e.geocode.center;
			if (!c || !c.lat || !c.lng) {
				return;
			}
			onSelect({ lat: c.lat, lng: c.lng });
			map.setView(c, 14);
		});
		control.addTo(map);
		return () => {
			// clean up on unmount
			control.remove();
		};
	}, [map, onSelect]);
	return null;
}

// Re-centers the map whenever `position` changes
function Recenter({ position }: { position: LatLng }) {
	const map = useMap();
	useEffect(() => {
		if (!position || !position.lat || !position.lng) {
			return;
		}
		map.setView([position.lat, position.lng], map.getZoom());
	}, [position, map]);
	return null;
}

// Captures click events and updates `position`
function ClickHandler({ onClick }: { onClick: (p: LatLng) => void }) {
	useMapEvents({
		click(e) {
			onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
		},
	});
	return null;
}

export const AddressPickerLeaflet = () => {
	const form = useFormContext<AddressSchema>();
	const [position, setPosition] = useState<LatLng>(DEFAULT_POS);

	// 1) Try browser geolocation once on mount
	useEffect(() => {
		// if there isn't a form value for latitude or longitude, try to get the user's location
		if (
			navigator.geolocation &&
			!form.getValues("endereco.latitude") &&
			!form.getValues("endereco.longitude")
		) {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					handlePositionChange({
						lat: coords.latitude,
						lng: coords.longitude,
					});
				},
				() => {
					console.warn("Geolocation unavailable — using fallback.");
				},
			);
		}
	}, []);

	useEffect(() => {
		// if the values are not the same, set the position (edit cases)
		if (
			form.getValues("endereco.latitude") !== position.lat ||
			form.getValues("endereco.longitude") !== position.lng
		) {
			if (
				!form.getValues("endereco.latitude") ||
				!form.getValues("endereco.longitude")
			) {
				return;
			}
			setPosition({
				lat: form.getValues("endereco.latitude"),
				lng: form.getValues("endereco.longitude"),
			});
		}
	}, [form.watch("endereco.latitude"), form.watch("endereco.longitude")]);

	const handlePositionChange = (position: LatLng) => {
		if (!position || !position.lat || !position.lng) {
			return;
		}
		setPosition(position);
		form.setValue("endereco.latitude", position.lat);
		form.setValue("endereco.longitude", position.lng);
	};

	return (
		<div className="flex flex-col gap-2">
			<MapContainer
				center={position}
				zoom={14}
				style={{ height: "400px", width: "100%", borderRadius: "8px" }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="© OpenStreetMap contributors"
				/>

				{/* Search box */}
				<GeocoderControl onSelect={handlePositionChange} />

				{/* Handle click-to-place */}
				<ClickHandler onClick={handlePositionChange} />

				{/* Keep map centered on `position` */}
				<Recenter position={position} />

				{/* The draggable marker */}
				<Marker position={position} />
			</MapContainer>

			{/* Manual Lat/Lng inputs */}
			<div className="flex gap-2 justify-between">
				<FormField
					name="endereco.latitude"
					control={form.control}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Latitude</FormLabel>
							<FormControl>
								<Input type="number" step="0.000001" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="endereco.longitude"
					control={form.control}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Longitude</FormLabel>
							<FormControl>
								<Input type="number" step="0.000001" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
};
