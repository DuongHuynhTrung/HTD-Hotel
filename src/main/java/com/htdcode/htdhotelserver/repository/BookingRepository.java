package com.htdcode.htdhotelserver.repository;

import com.htdcode.htdhotelserver.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
    List<BookedRoom> findByRoomId(Long roomId);

    Optional <BookedRoom> findByBookingConfirmationCode(String confirmationCode);
}