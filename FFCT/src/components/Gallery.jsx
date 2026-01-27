/**
 * GOOGLE LANGUAGES STYLE Gallery Section
 * Asymmetrical image grid with captions
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
    const sectionRef = useRef(null)

    const stories = [
        {
            image: 'https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=600&q=80',
            title: "Priya's Journey",
            quote: 'FFCT gave me the education that changed my life.',
            location: 'Rajasthan',
            size: 'large'
        },
        {
            image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=80',
            title: 'Village Transformation',
            quote: 'Our entire village now has access to clean water.',
            location: 'Maharashtra',
            size: 'medium'
        },
        {
            image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&q=80',
            title: 'Skill for Life',
            quote: 'The training program helped me start my own business.',
            location: 'Gujarat',
            size: 'small'
        },
        {
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
            title: 'Healthcare Heroes',
            quote: 'The mobile health clinic saved my mother\'s life.',
            location: 'Uttar Pradesh',
            size: 'medium'
        },
        {
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80',
            title: 'Green Revolution',
            quote: 'We planted over 10,000 trees in our district.',
            location: 'Madhya Pradesh',
            size: 'large'
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.gallery-tag', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

            gsap.from('.gallery-headline', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            })

            // Staggered image reveal
            gsap.from('.story-card', {
                y: 60,
                opacity: 0,
                scale: 0.95,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.stories-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="gallery"
            ref={sectionRef}
            className="relative section-padding bg-white overflow-hidden"
        >
            <div className="container-main">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="gallery-tag premium-tag mb-6">
                        Success Stories
                    </div>

                    <h2 className="gallery-headline text-headline font-heading text-dark mb-6" style={{ fontWeight: 400 }}>
                        Voices of{' '}
                        <span className="text-primary">Change</span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-slate">
                        Real stories from the communities we serve.
                    </p>
                </div>

                {/* Asymmetrical Grid - Google Languages style */}
                <div className="stories-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stories.map((story, index) => {
                        const gridClasses = [
                            'col-span-2 row-span-2', // large
                            'col-span-1 row-span-1', // small
                            'col-span-1 row-span-2', // tall
                            'col-span-2 row-span-1', // wide
                            'col-span-1 row-span-1', // small
                        ]

                        return (
                            <div
                                key={index}
                                className={`story-card group relative overflow-hidden rounded-2xl ${gridClasses[index % 5]}`}
                            >
                                {/* Image */}
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover min-h-[200px] group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Content on hover */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <Quote className="w-8 h-8 text-white/60 mb-3" />
                                    <p className="text-white text-lg font-medium mb-2 line-clamp-2">
                                        "{story.quote}"
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-semibold">{story.title}</span>
                                        <span className="text-white/70 text-sm">{story.location}</span>
                                    </div>
                                </div>

                                {/* Always visible label */}
                                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-dark">
                                    {story.location}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Gallery
