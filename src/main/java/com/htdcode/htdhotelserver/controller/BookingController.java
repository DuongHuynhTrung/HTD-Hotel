package com.htdcode.htdhotelserver.controller;

import com.htdcode.htdhotelserver.exception.InvalidBookingRequestException;
import com.htdcode.htdhotelserver.exception.ResourceNotFoundException;
import com.htdcode.htdhotelserver.model.BookedRoom;
import com.htdcode.htdhotelserver.model.Room;
import com.htdcode.htdhotelserver.response.BookingResponse;
import com.htdcode.htdhotelserver.response.RoomResponse;
import com.htdcode.htdhotelserver.service.proxy.BookingService;
import com.htdcode.htdhotelserver.service.proxy.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin()
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {
    private  final BookingService bookingService;

    private final RoomService roomService;
    @GetMapping()
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking:
             bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable("confirmationCode") String confirmationCode) {
        try {
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable("roomId") Long roomId,
                                         @RequestBody() BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Room booked successfully! Your booking confirmation code is: " + confirmationCode);
        } catch (InvalidBookingRequestException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/cancel/{bookingId}")
    public void cancelBooking(@PathVariable("bookingId") Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }


    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse roomResponse = new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getRoomPrice()
        );
        return new BookingResponse(
                booking.getBookingId(), booking.getCheckInDate(),
                booking.getCheckOutDate(), booking.getGuestFullName(),
                booking.getGuestEmail(), booking.getNumberOfAdults(),
                booking.getNumberOfChildren(), booking.getTotalNumberOfGuest(),
                booking.getBookingConfirmationCode(), roomResponse
        );
    }
}
