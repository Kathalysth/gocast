import { get } from "../utilities/fetch-wrappers";
import { Progress } from "./progress";

const DEFAULT_LECTURE_NAME = "Untitled lecture";

export class Stream {
    readonly ID: number;
    readonly Name: string;
    readonly End: string;
    readonly Start: string;

    Progress?: Progress;

    static New(obj): Stream {
        const s = Object.assign(new Stream(), obj);
        s.Name = s.Name === "" ? DEFAULT_LECTURE_NAME : s.Name;
        return s;
    }

    public FriendlyDateStart(): string {
        return new Date(this.Start).toLocaleString();
    }

    public UntilString(): string {
        const end = new Date(this.End);
        const hours = end.getHours();
        const minutes = end.getMinutes();
        return `Until ${hours}:${minutes < 10 ? minutes + "0" : minutes}`;
    }
}

export class Course {
    readonly ID: number;
    readonly Visibility: string;
    readonly Slug: string;
    readonly Year: number;
    readonly TeachingTerm: string;
    readonly Name: string;

    readonly NextLecture?: Stream;
    readonly LastLecture?: Stream;

    static New(obj): Course {
        const c = Object.assign(new Course(), obj);
        c.NextLecture = c.NextLecture ? Stream.New(obj.NextLecture) : undefined;
        c.LastLecture = c.LastLecture ? Stream.New(obj.LastLecture) : undefined;
        return c;
    }

    public URL(): string {
        return `/course/${this.Year}/${this.TeachingTerm}/${this.Slug}`;
    }

    public LastLectureURL(): string {
        return `/w/${this.Slug}/${this.LastLecture.ID}`;
    }

    public NextLectureURL(): string {
        return `/w/${this.Slug}/${this.NextLecture.ID}`;
    }

    public IsHidden(): boolean {
        return this.Visibility === "hidden";
    }
}

export class LectureHall {
    readonly Name: string;
    readonly ExternalURL: string;

    constructor(obj: LectureHall) {
        this.Name = obj.Name;
        this.ExternalURL = obj.ExternalURL;
    }
}

export class Livestream {
    readonly Stream: Stream;
    readonly Course: Course;
    readonly LectureHall?: LectureHall;

    constructor(obj: Livestream) {
        this.Stream = Stream.New(obj.Stream);
        this.Course = Course.New(obj.Course);
        this.LectureHall = obj.LectureHall ? new LectureHall(obj.LectureHall) : undefined;
    }

    public InLectureHall(): boolean {
        return this.LectureHall !== undefined;
    }
}

/**
 * REST API Wrapper for /api/courses
 */
export const CoursesAPI = {
    async getLivestreams() {
        return get("/api/courses/live").then((livestreams) => livestreams.map((l) => new Livestream(l)));
    },

    async getPublic(year?: number, term?: string): Promise<object> {
        return get(`/api/courses/public${this.query(year, term)}`).then((courses) => courses.map((c) => Course.New(c)));
    },

    async getUsers(year?: number, term?: string): Promise<object> {
        return get(`/api/courses/users${this.query(year, term)}`).then((courses) => courses.map((c) => Course.New(c)));
    },

    query: (year?: number, term?: string) =>
        year !== undefined && term !== undefined && year !== 0 ? `?year=${year}&term=${term}` : "",
};