import React from 'react'

const Facilities = () => {
  const sections = [
        {
            id: 'computer-lab',
            title: 'Computer Lab',
            text: [
                'Alok Higher Secondary School, Chandauli has been a beacon of excellence in education since its establishment. We are committed to providing quality education that nurtures young minds and shapes future leaders.',
                'Our school follows the motto "विद्या ददाति विनयम्" (Knowledge bestows humility) and strives to create an environment where students can flourish academically, socially, and morally.',
            ],
            image: 'https://placehold.co/600x400/d7dbe2/4b2e83?text=Computer+Lab',
            alt: 'Computer Lab',
            reverse: false,
        },
        {
            id: 'library',
            title: "Library",
            text: [
                'At Alok Inter College, we believe education is not just about books, but about building character, nurturing values, and inspiring a lifelong passion for learning. As Principal, my vision is to ensure that every child is empowered with knowledge, compassion, and confidence to succeed in life.',
                'Our dedicated staff and holistic approach ensure that students excel academically while also growing into responsible citizens.',
            ],
            image: 'https://placehold.co/600x400/d7dbe2/4b2e83?text=Library',
            alt: 'Library',
            reverse: true,
        },
        {
            id: 'transport',
            title: "Transport",
            text: [
                'Education is the most powerful tool that can transform lives and societies. At Alok Inter College, our goal is to provide a nurturing environment where innovation, discipline, and creativity are encouraged.',
                'We are committed to building an institution that fosters intellectual growth, leadership, and values, shaping future leaders for the nation.',
            ],
            image: 'https://placehold.co/600x400/d7dbe2/4b2e83?text=Transport',
            alt: 'Transport',
            reverse: false,
        },
        {
            id: 'sports',
            title: 'Sports Complex',
            text: [
                'Education is the most powerful tool that can transform lives and societies. At Alok Inter College, our goal is to provide a nurturing environment where innovation, discipline, and creativity are encouraged.',
                'We are committed to building an institution that fosters intellectual growth, leadership, and values, shaping future leaders for the nation.',
            ],
            image: 'https://placehold.co/600x400/d7dbe2/4b2e83?text=Sports+Complex',
            alt: 'Sports Complex',
            reverse: true,
        },
    ];

    return (
        <section className="py-8 md:py-16 bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto px-4">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        id={section.id}
                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-24 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div className="w-full md:w-1/2">
                            <img
                                src={section.image}
                                alt={section.alt}
                                className="w-full h-auto rounded-xl shadow-lg object-cover"
                            />
                        </div>
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-semibold text-purple-800 mb-4">{section.title}</h2>
                            {section.text.map((paragraph, pIndex) => (
                                <p key={pIndex} className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Facilities