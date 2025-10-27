import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedVinylRecords1712345678901 implements MigrationInterface {
    name = 'SeedVinylRecords1712345678901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "vinyls" ("name", "authorName", "description", "price") VALUES
            ('Dark Side of the Moon', 'Pink Floyd', 'Progressive rock masterpiece from 1973', 29.99),
            ('Thriller', 'Michael Jackson', 'Best-selling album of all time', 24.99),
            ('Abbey Road', 'The Beatles', 'Iconic final studio album', 27.50),
            ('Kind of Blue', 'Miles Davis', 'Landmark jazz album', 32.99),
            ('Rumours', 'Fleetwood Mac', 'Classic soft rock album', 26.75),
            ('Nevermind', 'Nirvana', 'Grunge revolution defining album', 28.99),
            ('The Wall', 'Pink Floyd', 'Rock opera concept album', 31.25),
            ('Back in Black', 'AC/DC', 'Best-selling hard rock album', 23.99),
            ('Led Zeppelin IV', 'Led Zeppelin', 'Classic rock masterpiece', 30.50),
            ('Hotel California', 'Eagles', 'Country rock classic', 25.99),
            ('The Rise and Fall of Ziggy Stardust', 'David Bowie', 'Glam rock concept album', 27.99),
            ('A Night at the Opera', 'Queen', 'Progressive rock with operatic elements', 29.75),
            ('Purple Rain', 'Prince', 'Soundtrack and studio album', 26.50),
            ('Blood on the Tracks', 'Bob Dylan', 'Folk rock masterpiece', 24.99),
            ('London Calling', 'The Clash', 'Punk rock classic', 28.25),
            ('Pet Sounds', 'The Beach Boys', 'Innovative pop production', 33.99),
            ('Revolver', 'The Beatles', 'Psychedelic rock innovation', 26.99),
            ('OK Computer', 'Radiohead', 'Alternative rock landmark', 27.50),
            ('The Joshua Tree', 'U2', 'Atmospheric rock album', 25.75),
            ('Blue', 'Joni Mitchell', 'Acoustic folk masterpiece', 22.99),
            ('To Pimp a Butterfly', 'Kendrick Lamar', 'Jazz-infused hip hop', 29.99),
            ('Illmatic', 'Nas', 'East coast hip hop classic', 31.50),
            ('The Chronic', 'Dr. Dre', 'West coast G-funk album', 28.99),
            ('Ready to Die', 'The Notorious B.I.G.', 'East coast hip hop', 27.75),
            ('The Miseducation of Lauryn Hill', 'Lauryn Hill', 'Neo soul and hip hop', 26.99),
            ('Random Access Memories', 'Daft Punk', 'Electronic disco revival', 24.50),
            ('Discovery', 'Daft Punk', 'French house electronic', 25.99),
            ('Homework', 'Daft Punk', 'Debut house album', 23.75),
            ('In Rainbows', 'Radiohead', 'Experimental rock', 28.99),
            ('Kid A', 'Radiohead', 'Electronic influenced rock', 29.50),
            ('AM', 'Arctic Monkeys', 'Indie rock with R&B influences', 22.99),
            ('Whatever People Say I Am', 'Arctic Monkeys', 'Debut indie rock album', 21.75),
            ('Currents', 'Tame Impala', 'Psychedelic pop', 26.99),
            ('Lonerism', 'Tame Impala', 'Psychedelic rock', 25.50),
            ('The Suburbs', 'Arcade Fire', 'Indie rock concept album', 24.99),
            ('Funeral', 'Arcade Fire', 'Debut indie rock album', 23.75),
            ('Is This It', 'The Strokes', 'Garage rock revival', 22.99),
            ('Room on Fire', 'The Strokes', 'Post-punk revival', 21.50),
            ('Contra', 'Vampire Weekend', 'Indie pop with world music', 23.99),
            ('Modern Vampires of the City', 'Vampire Weekend', 'Art pop album', 24.75),
            ('Melodrama', 'Lorde', 'Electropop masterpiece', 20.99),
            ('Pure Heroine', 'Lorde', 'Debut minimalist pop', 19.99),
            ('Channel Orange', 'Frank Ocean', 'R&B and soul', 27.50),
            ('Blonde', 'Frank Ocean', 'Alternative R&B', 29.99),
            ('To Be Kind', 'Swans', 'Experimental rock', 32.99),
            ('The Seer', 'Swans', 'Post-rock epic', 31.75),
            ('Soundtracks for the Blind', 'Swans', 'Experimental double album', 34.50),
            ('Lift Your Skinny Fists', 'Godspeed You! Black Emperor', 'Post-rock symphony', 33.25),
            ('F#A#∞', 'Godspeed You! Black Emperor', 'Apocalyptic post-rock', 30.99),
            ('Ágætis byrjun', 'Sigur Rós', 'Icelandic post-rock', 28.75);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "vinyl" WHERE "name" IN (
            'Dark Side of the Moon', 'Thriller', 'Abbey Road', 'Kind of Blue', 'Rumours',
            'Nevermind', 'The Wall', 'Back in Black', 'Led Zeppelin IV', 'Hotel California',
            'The Rise and Fall of Ziggy Stardust', 'A Night at the Opera', 'Purple Rain',
            'Blood on the Tracks', 'London Calling', 'Pet Sounds', 'Revolver', 'OK Computer',
            'The Joshua Tree', 'Blue', 'To Pimp a Butterfly', 'Illmatic', 'The Chronic',
            'Ready to Die', 'The Miseducation of Lauryn Hill', 'Random Access Memories',
            'Discovery', 'Homework', 'In Rainbows', 'Kid A', 'AM', 'Whatever People Say I Am',
            'Currents', 'Lonerism', 'The Suburbs', 'Funeral', 'Is This It', 'Room on Fire',
            'Contra', 'Modern Vampires of the City', 'Melodrama', 'Pure Heroine',
            'Channel Orange', 'Blonde', 'To Be Kind', 'The Seer', 'Soundtracks for the Blind',
            'Lift Your Skinny Fists', 'F#A#∞', 'Ágætis byrjun'
        )`);
    }
}