CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','user') NOT NULL, 
  `photoUrl` TEXT,
  `created` timestamp DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `buddies` ( 
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `buddyId` int(11) default NULL,
  `buddyEmail` varchar(255) NOT NULL,
  `message` text,
  `status` enum('accepted', 'rejected', 'pending') default 'pending',
  `created` timestamp DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_userId_buddyEmail` (`userId`, `buddyEmail`),
  CONSTRAINT `users_buddies_id` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `buddies_users_id` FOREIGN KEY (`buddyId`) REFERENCES `users` (`id`) ON DELETE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;